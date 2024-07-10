import 'dotenv/config';
import * as joi from 'joi';
/* 
* Instalar 
* - npm i dotenv
* - npm i joi
* */

interface EnvVars {
    PORT          : number;
    NODE_ENV      : string;
    STRIPE_SECRET : string;
    STRIPE_SUCCESS_URL : string;
    STRIPE_CANCER_URL : string;
    STRIPE_ENDPOINT_SECRET : string;
}

const envsSchema = joi.object({

    PORT          : joi.number().required(),
    NODE_ENV      : joi.string().required(),
    STRIPE_SECRET : joi.string().required(),
    STRIPE_SUCCESS_URL : joi.string().required(),
    STRIPE_CANCER_URL : joi.string().required(),
    STRIPE_ENDPOINT_SECRET : joi.string().required(),
})
.unknown(true) //! Acepta todas las propiedad, no solo las validadas


const {error, value } = envsSchema.validate ({...process.env});

if ( error ) throw new Error(`Config Validation Error: ${ error.message }`);
  

const envVars: EnvVars = value;  

export const envs = {

    PORT          : envVars.PORT,
    NODE_ENV      : envVars.NODE_ENV,
    STRIPE_SECRET : envVars.STRIPE_SECRET,
    STRIPE_SUCCESS_URL : envVars.STRIPE_SUCCESS_URL,
    STRIPE_CANCER_URL : envVars.STRIPE_CANCER_URL,
    STRIPE_ENDPOINT_SECRET : envVars.STRIPE_ENDPOINT_SECRET,
}