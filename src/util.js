/**
 *
 * @param input
 * @returns {string}
 */
function hcmGetValue(input) {
    let value = ''
    if (input != null && typeof input === 'object' && typeof input.value === 'string') {
        value = input.value
    }
    return value.trim()
}

/**
 * create hidden input
 * @param form
 * @param inputName
 * @param inputValue
 */
function hcmCreateHiddenInputFields(form, inputName, inputValue) {
    if (form === null) {
        console.error('Missing Form Name')
        return
    }
    if (inputName === null) {
        console.error('Missing Input Name')
        return
    }
    if (inputValue === null) {
        console.error('Missing Input Value')
        return
    }
    inputValue = inputValue.trim()
    if (document.getElementById(inputName) !== null) {
        document.getElementById(inputName).value = inputValue
    } else {
        let input = document.createElement('input')
        input.type = 'hidden'
        input.id = inputName
        input.name = inputName
        input.value = inputValue
        form.appendChild(input)
    }
}

/**
 *
 * @returns {boolean}
 */
function hcmCheckRequiredFields() {
    if (typeof required_fields === 'undefined') {
        return true
    } else {
        let required_fields_array = JSON.parse(required_fields)
        for (let counter = 0; counter < required_fields_array.length; counter++) {
            let input_field_id = required_fields_array[counter]['key']
            let input_field_label = required_fields_array[counter]['label']
            let input_field_object = document.getElementById(input_field_id)
            if (input_field_object === null) {
                alert('WooCommerce Required Field is Missing - ' + input_field_label)
                return false
            } else if (input_field_object.value.trim() === '') {
                alert('WooCommerce Required Field is Missing - ' + input_field_label)
                input_field_object.focus()
                return false
            }
        }
    }
    return true
}

/**
 *
 * @param id
 */
export function hcmHide(id) {
    if (document.getElementById(id) !== null) {
        document.getElementById(id).style.display = 'none'
    }
}

/**
 *
 * @param id
 */
export function hcmDisplay(id) {
    if (document.getElementById(id) !== null) {
        document.getElementById(id).style.display = ''
    }
}

/**
 *
 * @param woocommerceForm
 */
function hcmSetBillingInfo(woocommerceForm) {
    let billing_first_name = document.getElementById('billing-first_name')
    let billing_last_name = document.getElementById('billing-last_name')
    let billing_company = document.getElementById('billing-company')
    let billing_country = document.getElementById('billing-country')
    let billing_address_1 = document.getElementById('billing-address_1')
    let billing_address_2 = document.getElementById('billing-address_2')
    let billing_city = document.getElementById('billing-city')
    let billing_state = document.getElementById('billing-state')
    let billing_postcode = document.getElementById('billing-postcode')
    let billing_phone = document.getElementById('billing-phone')
    let billing_email = document.getElementById('billing-email')
    if (billing_first_name !== null || billing_last_name !== null) {
        let billing_contactName = ''
        if (billing_first_name !== null) {
            billing_contactName += hcmGetValue(billing_first_name)
        }
        if (billing_last_name !== null) {
            billing_contactName += ' ' + hcmGetValue(billing_last_name)
        }
        hcmCreateHiddenInputFields(woocommerceForm, 'billing_contactName', billing_contactName.trim())
        hcmCreateHiddenInputFields(woocommerceForm, 'cardHolderName', billing_contactName.trim())
    }
    if (billing_company !== null) {
        hcmCreateHiddenInputFields(woocommerceForm, 'billing_businessName', hcmGetValue(billing_company))
    }
    if (billing_address_1 !== null) {
        hcmCreateHiddenInputFields(woocommerceForm, 'billing_street1', hcmGetValue(billing_address_1))
        hcmCreateHiddenInputFields(woocommerceForm, 'cardHolderAddress', hcmGetValue(billing_address_1))
    }
    if (billing_address_2 !== null) {
        hcmCreateHiddenInputFields(woocommerceForm, 'billing_street2', hcmGetValue(billing_address_2))
    }
    if (billing_city !== null) {
        hcmCreateHiddenInputFields(woocommerceForm, 'billing_city', hcmGetValue(billing_city))
    }
    if (billing_state !== null) {
        hcmCreateHiddenInputFields(woocommerceForm, 'billing_province', hcmGetValue(billing_state))
    }
    if (billing_postcode !== null) {
        hcmCreateHiddenInputFields(woocommerceForm, 'billing_postalCode', hcmGetValue(billing_postcode))
        hcmCreateHiddenInputFields(woocommerceForm, 'cardHolderPostalCode', hcmGetValue(billing_postcode))
    }
    if (billing_country !== null) {
        hcmCreateHiddenInputFields(woocommerceForm, 'billing_country', hcmGetValue(billing_country))
    }
    if (billing_phone !== null) {
        hcmCreateHiddenInputFields(woocommerceForm, 'billing_phone', hcmGetValue(billing_phone))
    }
    if (billing_email !== null) {
        hcmCreateHiddenInputFields(woocommerceForm, 'billing_email', hcmGetValue(billing_email))
    }
}

/**
 *
 * @param woocommerceForm
 */
function hcmSetShippingInfo(woocommerceForm) {
    let shipping_first_name = document.getElementById('shipping-first_name')
    let shipping_last_name = document.getElementById('shipping-last_name')
    let shipping_company = document.getElementById('shipping-company')
    let shipping_country = document.getElementById('shipping-country')
    let shipping_address_1 = document.getElementById('shipping-address_1')
    let shipping_address_2 = document.getElementById('shipping-address_2')
    let shipping_city = document.getElementById('shipping-city')
    let shipping_state = document.getElementById('shipping-state')
    let shipping_postcode = document.getElementById('shipping-postcode')
    let shipping_phone = document.getElementById('shipping-phone')
    let shipping_email = document.getElementById('shipping-email')
    let differentShipping = document.getElementById('ship-to-different-address-checkbox')
    if (differentShipping !== null && !differentShipping.checked) {
        //
        // SHIPPING IS SAME AS BILLING
        //
        if (document.getElementById('billing-contactName') !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_contactName', hcmGetValue(document.getElementById('billing-contactName')))
        }
        if (document.getElementById('billing-company') !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_businessName', hcmGetValue(document.getElementById('billing-company')))
        }
        if (document.getElementById('billing-address_1') !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_street1', hcmGetValue(document.getElementById('billing-address_1')))
        }
        if (document.getElementById('billing-address_2') !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_street2', hcmGetValue(document.getElementById('billing-address_2')))
        }
        if (document.getElementById('billing-city') !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_city', hcmGetValue(document.getElementById('billing-city')))
        }
        if (document.getElementById('billing-state') !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_province', hcmGetValue(document.getElementById('billing-state')))
        }
        if (document.getElementById('billing-postcode') !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_postalCode', hcmGetValue(document.getElementById('billing-postcode')))
        }
        if (document.getElementById('billing-country') !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_country', hcmGetValue(document.getElementById('billing-country')))
        }
        if (document.getElementById('billing-phone') !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_phone', hcmGetValue(document.getElementById('billing-phone')))
        }
        if (document.getElementById('billingemail') !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_email', hcmGetValue(document.getElementById('billingemail')))
        }
    } else {
        //
        // SHIPPING IS DIFFERENT
        //
        if (shipping_first_name !== null || shipping_last_name !== null) {
            let shipping_contactName = ''
            if (shipping_first_name !== null) {
                shipping_contactName += hcmGetValue(shipping_first_name)
            }
            if (shipping_last_name !== null) {
                shipping_contactName += ' ' + hcmGetValue(shipping_last_name)
            }
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_contactName', shipping_contactName.trim())
        }
        if (shipping_company !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_businessName', hcmGetValue(shipping_company))
        }
        if (shipping_address_1 !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_street1', hcmGetValue(shipping_address_1))
        }
        if (shipping_address_2 !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_street2', hcmGetValue(shipping_address_2))
        }
        if (shipping_city !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_city', hcmGetValue(shipping_city))
        }
        if (shipping_state !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_province', hcmGetValue(shipping_state))
        }
        if (shipping_postcode !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_postalCode', hcmGetValue(shipping_postcode))
        }
        if (shipping_country !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_country', hcmGetValue(shipping_country))
        }
        if (shipping_phone !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_phone', hcmGetValue(shipping_phone))
        }
        if (shipping_email !== null) {
            hcmCreateHiddenInputFields(woocommerceForm, 'shipping_email', hcmGetValue(shipping_email))
        }
    }
}


/**
 *
 * @param woocommerceForm
 */
function hcmSetOrderInfo(woocommerceForm) {
    let order_comments = document.getElementById('order_comments')
    if (order_comments !== null) {
        hcmCreateHiddenInputFields(woocommerceForm, 'comments', hcmGetValue(order_comments))
    }
}

function hcmGenerateCaptchaToken(siteKey) {
    return new Promise(function (resolve, reject) {
         grecaptcha.ready(function () {
             grecaptcha.execute(siteKey, {action: 'helcimJSCheckout'})
                .then(function (token) {
                    document.getElementById('g-recaptcha-response').value = token
                    resolve(token)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    })
}

export function hcmStartProcess(siteKey) {
        let helcimResults = document.getElementById('helcimResults')
        let woocommerceForm = null

        if(document.querySelector('.wc-block-checkout__form') !== null){
            woocommerceForm = document.querySelector('.wc-block-checkout__form')
        }else if (document.forms['checkout'] !== null) {
            woocommerceForm = document.forms['checkout']
        } else if (document.forms['order_review'] !== null) {
            woocommerceForm = document.forms['order_review']
        } else {
            return Promise.reject('Missing Form')
        }

        hcmSetBillingInfo(woocommerceForm)
        hcmSetShippingInfo(woocommerceForm)
        hcmSetOrderInfo(woocommerceForm)
        if (!hcmCheckRequiredFields()) {
            return Promise.reject('Missing Required Fields')
        }

    return new Promise(function (resolve, reject) {
        hcmGenerateCaptchaToken(siteKey)
            .then(function (token) {
                hcmProcessVerify(woocommerceForm, helcimResults)
                    .then(function (response) {
                        // hcmClearCardData()
                        resolve(response)
                    })
                    .catch(function (error) {
                        reject('Something went wrong please contact the Merchant. '+error)
                    })
            })
            .catch(function (error) {
                reject('Something went wrong please contact the Merchant. '+error)
            })
    })
}

/**
 *
 * @param woocommerceForm
 * @param helcimResults
 * @returns {Promise<never>|Promise<T>}
 */
function hcmProcessVerify(woocommerceForm, helcimResults) {
    helcimResults.innerHTML = ''
    if (typeof helcimProcess === 'undefined' || typeof helcimProcess !== 'function') {
        return Promise.reject('Missing version2.js')
    }
    return helcimProcess()
        .then(function (value) {
            let response = document.getElementById('response')
            let responseMessage = document.getElementById('responseMessage')
            let errorMessage
            if (responseMessage === null) {
                errorMessage = 'Something went wrong. Please try again'
            } else {
                errorMessage = responseMessage.value
            }
            if (response === null || parseInt(response.value) === 0) {
                // hcmHide('LoadingScreen1')
                return Promise.reject(errorMessage)
            }
            // hcmClearCardData()
            return Promise.resolve(value)
        })
        .catch(function (error) {
            hcmCreateHiddenInputFields(woocommerceForm, 'g-recaptcha-response', '')
            helcimResults.innerHTML = ''
            // hcmHide('LoadingScreen1')
            return Promise.reject(error)
        })
}

// export function hcmClearCardData() {
//     hcmClearData('cardNumber')
//     hcmClearData('cardExpiryMonth')
//     hcmClearData('cardExpiryYear')
//     hcmClearData('cardCVV')
// }

// /**
//  *
//  * @param id
//  */
// export function hcmClearData(id) {
//     let input = document.getElementById(id)
//     if (typeof input === 'undefined' || input === null) {
//         return
//     }
//     if (input.value === undefined) {
//         return
//     }
//     input.value = ''
// }
