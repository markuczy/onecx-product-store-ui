/**
 * onecx-product-store-bff
 * Backend-For-Frontend (BFF) service for onecx product store. With this API you can manage applications (technical microfrontend(s)) and product(s) as logical abstraction. A Product is a versioned cover for a collection of applications (versioned) to be used within workspaces. Microfrontends (applications) which have reference to exposed/registered modules
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: tkit_dev@1000kit.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Microservice } from './microservice';
import { SlotPageItem } from './slotPageItem';
import { MicrofrontendAbstract } from './microfrontendAbstract';


export interface ProductDetails { 
    name?: string;
    microfrontends?: Array<MicrofrontendAbstract>;
    microservices?: Array<Microservice>;
    slots?: Array<SlotPageItem>;
}

