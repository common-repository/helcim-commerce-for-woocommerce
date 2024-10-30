import {hcmStartProcess, hcmDisplay, hcmHide} from "./util";

const { getSetting } = window.wc.wcSettings
const useState = window.wp.element.useState;
const useEffect = window.wp.element.useEffect;

const settings = getSetting( 'helcimjs_data', {} )

function CreditCardForm(props) {

    const { eventRegistration, emitResponse,billing, shippingData } = props
    const { onPaymentSetup } = eventRegistration

    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardHolder: '',
        cardExpiryMonth: '',
        cardExpiryYear: '',
        cardCVV: '',
        gRecptchaResponse: '',
        pluginName: settings.fields.pluginName,
        pluginVersion: settings.fields.pluginVersion,
        jsToken: settings.fields.jsToken,
        // isTest: settings.fields.isTest,
        customerCode: settings.fields.customerCode,

        cardHolderName : (billing.billingAddress.first_name + " "+ billing.billingAddress.last_name).trim(),
        cardHolderAddress : billing.billingAddress.address_1,
        cardHolderPostalCode : billing.billingAddress.postcode,
    })

    useEffect( () => {
        const unsubscribe = onPaymentSetup( async () => {
            // Here we can do any processing we need, and then emit a response.
            const pluginName = cardDetails.pluginName
            const cardNumber = cardDetails.cardNumber
            const cardExpiryMonth = cardDetails.cardExpiryMonth
            const cardExpiryYear = cardDetails.cardExpiryYear
            const cardCVV = cardDetails.cardCVV
            const isCheckoutBlocks = 1


            if(!settings.fields.isJs){
                return {
                    type: emitResponse.responseTypes.SUCCESS,
                    meta: {
                        paymentMethodData: {
                            isCheckoutBlocks,
                            pluginName,
                            cardNumber,
                            cardExpiryMonth,
                            cardExpiryYear,
                            cardCVV,
                        },
                    },
                }
            }

            let xml = ''
            let hash = ''
            let processed = false
            let errorMessage = ''

            hcmDisplay('LoadingScreen1')
            await hcmStartProcess(settings.fields.recaptchaSiteKey)
                .then(function (data) {
                    xml = window.btoa(document.getElementById('xml').value)
                    hash = document.getElementById('xmlHash').value
                    processed = true
                })
                .catch(function (error) {
                    processed = false
                    errorMessage = error
                })

            hcmHide('LoadingScreen1')
            if(!processed){
                return {
                    type: emitResponse.responseTypes.ERROR,
                    message: errorMessage,
                    meta: {
                        paymentMethodData: {
                            isCheckoutBlocks,
                            pluginName,
                            errorMessage,
                        },
                    },
                }
            }

            return {
                type: emitResponse.responseTypes.SUCCESS,
                meta: {
                    paymentMethodData: {
                        isCheckoutBlocks,
                        pluginName,
                        xml,
                        hash,
                    },
                },
            }
        } )

        // Unsubscribes when this component is unmounted.
        return () => {
            unsubscribe()
        }
    }, [
        emitResponse.responseTypes.ERROR,
        emitResponse.responseTypes.SUCCESS,
        onPaymentSetup,
        cardDetails,
    ] )

    const handleChange = (event) => {
        const { name, value } = event.target

        setCardDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }))
    }


    const monthOptions = ['--','01','02','03','04','05','06','07','08','09','10','11','12']
    const yearOptions = [<option value="--">--</option>]
    const currentYear = new Date().getFullYear()
    for (let i=0; i <= 10; i++){
        let year =currentYear+i
        yearOptions.push(<option value={year}>{year}</option>)
    }

    return (
        <div>
            <div id="LoadingScreen1"
                 style={{
                     position: "fixed",
                     left: 0,
                     top: 0,
                     width: "100%",
                     height: "100%",
                     backgroundColor: "rgba(0,0,0,0.65)",
                     paddingTop: "25vh",
                     boxSizing: "border-box",
                     display: "none"
                 }}>
                <div align="center">
                    <div style={{
                        border: "2px solid #81B1D1",
                        borderTop: "2px solid #127295",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        animation: "AnimationLoader1 0.75s linear infinite"
                    }}></div>
                    <div style={{
                        padding: "20px 0 0 0",
                        fontSize: "17px",
                        color: "white"
                    }}>Processing, Please Wait...
                    </div>
                </div>
            </div>
            <div id="helcimResults"></div>
            <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" value={cardDetails.gRecptchaResponse} />
            <input type="hidden" id="amount" value="0"/>
            <input type="hidden" id="woocommerce" value="1"/>
            <input type="hidden" id="plugin" value={cardDetails.pluginName} />
            <input type="hidden" id="pluginVersion" value={cardDetails.pluginVersion} />
            <input type="hidden" id="token" value={cardDetails.jsToken} />
            <input type="hidden" id="test" value={cardDetails.isTest} />
            <input type="hidden" id="customerCode" value={cardDetails.customerCode} />

            {/*TODO: display if billing first and last name does not exist. (pay for existing invoice)*/}
            <p id="tr_cardHolderName" className="form-row form-row-wide" style={{display: 'none'}}>
                <label htmlFor="cardHolderName">Name&nbsp;<span className="required">*</span></label>
                <input type="text" className="input-text" id="cardHolderName" name="cardHolderName" value={cardDetails.cardHolderName}/>
            </p>

            <p className="form-row form-row-wide">
                <label htmlFor="cardNumber">Card Number&nbsp;<span className="required">*</span></label>
                <input type="text" className="input-text wc-credit-card-form-card-number" value={cardDetails.cardNumber} id="cardNumber"
                       name="cardNumber" onChange={handleChange} inputMode="numeric"
                       autoComplete="cc-number" autoCorrect="no" autoCapitalize="no" spellCheck="no"
                       placeholder="&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;"/>
            </p>

            <p className="form-row form-row-first">
                <label htmlFor="cardExpiryMonth">Expiry Month&nbsp;<span className="required">*</span></label>
                <select id="cardExpiryMonth" name="cardExpiryMonth"
                        className="input-text wc-credit-card-form-card-expiry"
                        onChange={handleChange}>
                    {monthOptions.map((month, index) => (
                        <option value={month}>{month}</option>
                    ))}
                </select>
            </p>

            <p className="form-row form-row-last">
                <label htmlFor="cardExpiryYear">Expiry Year&nbsp;<span className="required">*</span></label>
                <select id="cardExpiryYear" name="cardExpiryYear" className="input-text wc-credit-card-form-card-expiry"
                        onChange={handleChange}>
                    {yearOptions}
                </select>
            </p>

            <p className="form-row form-row-first">
                <label htmlFor="cardCVV">CVV2&nbsp;<span className="required">*</span></label>
                <input id="cardCVV" onChange={handleChange} value={cardDetails.cardCVV}
                       className="input-text wc-credit-card-form-card-cvc"
                       inputMode="numeric" autoComplete="off" autoCorrect="no" autoCapitalize="no" spellCheck="no"
                       maxLength="4" placeholder="CVC" name="cardCVV" style={{width:'100px'}}/>
            </p>

            {/*TODO: display if billing street 1 does not exist. (pay for existing invoice)*/}
            <p id="tr_cardHolderAddress" className="form-row form-row-wide" style={{display: 'none'}}>
                <label htmlFor="cardHolderAddress">Street Address&nbsp;<span className="required">*</span></label>
                <input type="text" className="input-text" value={cardDetails.cardHolderAddress} id="cardHolderAddress" name="cardHolderAddress" onChange={handleChange}/>
            </p>

            {/*TODO: display if billing postalCode does not exist. (pay for existing invoice)*/}
            <p id="tr_cardHolderPostalCode" className="form-row form-row-wide" style={{display: 'none'}}>
                <label htmlFor="cardHolderPostalCode">Postal/ZIP Code&nbsp;<span className="required">*</span></label>
                <input type="text" className="input-text" id="cardHolderPostalCode"
                       name="cardHolderPostalCode" value={cardDetails.cardHolderPostalCode} onChange={handleChange}/>
            </p>
        </div>
    )
}

export default CreditCardForm
