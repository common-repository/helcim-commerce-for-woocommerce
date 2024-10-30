import { decodeEntities } from '@wordpress/html-entities';
import CreditCardForm from './CreditCardForm';


const { registerPaymentMethod } = window.wc.wcBlocksRegistry
const { getSetting } = window.wc.wcSettings
const settings = getSetting( 'helcimjs_data', {} )
const label = decodeEntities( settings.title )

const Content = ( props ) => {
    return <CreditCardForm {...props}/>
}


const Label = () => {
    return (
        <span style={{ width: '100%' }}>
            {label}
            <Icon />
        </span>
    )
}

const Icon = () => {
    return settings.icon
        ? <img src={settings.icon} style={{ float: 'right', marginRight: '20px' }} />
        : ''
}

registerPaymentMethod( {
    name: "helcimjs",
    label: <Label />,
    content: <Content />,
    edit: <Content />,
    canMakePayment: () => true,
    ariaLabel: label,
    supports: {
        features: settings.supports,
    }
} )