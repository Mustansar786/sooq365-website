import { createString } from '../utils/helper';

export const analyticFunction = (window: any, { name, id, price, brand, category, variant, position }: { name: string, id: string, price: string, brand: string, category: string, variant: string, position: string }) => {
    window?.dataLayer?.push({ ecommerce: null });  // Clear the previous ecommerce object.
    window?.dataLayer?.push({
        'ecommerce': {
            'detail': {
                'actionField': { 'list': 'Apparel Gallery' },    // 'detail' actions have an optional list property.
                'products': [{
                    'name': name,         // Name or ID is required.
                    'id': id,
                    'price': price,
                    'brand': brand,
                    'category': category,
                    'variant': variant,
                    'position': position
                }]
            }
        }
    })
} // vehicle detail

export const analytic_first_open = (window: any) => {
    window?.dataLayer?.push({ 'event': 'first_open', 'value': 25 });
} // home page

export const analytic_for_initial_Setup = (window: any, key: string) => {
    window?.dataLayer?.push({ 'event': key });
} // login register and upload docs

export const analytic_for_purchase = (window: any, key: string, value: any) => {
    window?.dataLayer?.push({ ecommerce: null });
    window?.dataLayer?.push({ 'event': key, 'ecommerce': value });
} //checkout click and vehicle details

export const analytic_for_begin_checkout = (window: any, key: string, value: any) => {
    window?.dataLayer?.push({ 'event': key, 'ecommerce': value });
} // checkout out click and in response

export const analytic_for_final_Purchase = (window: any, key: string, vehicle:any, days:number,price:string, billing_id:string) => {

    if(Object.keys(vehicle).length >0){
        const name = createString([
            vehicle?.brand?.name,
            vehicle?.model?.name,
            vehicle?.attributes?.hasOwnProperty('Year') ? 
            vehicle?.attributes.Year.value : ''])

        const ecommerce = {
            currencyCode: "AED",
            purchase: {
                actionField: {id: billing_id, revenue: price},
                products: [{
                    id: vehicle?.id,
                    name: name,
                    category: vehicle?.category?.icon,
                    brand: vehicle?.brand?.name,
                    quantity: days || 1,
                    price:vehicle?.price
                }]
            }
        }
    window?.dataLayer?.push({ 'event': key, ecommerce });
    }
        
} // payment success

