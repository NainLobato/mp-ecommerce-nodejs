// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token: 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181',
  integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
});

// Crea un objeto de preferencia
const mapPreference = (title, price, img, url) => ({
    items: [
      {
        id: 1234,
        title,
        description: '“Dispositivo móvil de Tienda e-commerce',
        unit_price: parseInt(price, 10),
        quantity: 1,
        currency_id: 'MXN',
        picture_url: `https://nainlobato-mp-ecommerce-nodejs.herokuapp.com${img.substring(1)}`,
      }
    ],
    payer: {
        name: 'Lalo',
        surname: 'Landa',
        email: 'test_user_58295862@testuser.com',
        phone: {
            area_code: '52',
            number: 5549737300
        },
        address: {
            zip_code: '03940',
            street_name: 'Insurgentes Sur',
            street_number: 1602
        }
    },
    payment_methods: {
        excluded_payment_methods: [
            {
                id: 'amex'
            }
        ],
        excluded_payment_types: [
            {
                id: 'atm'
            }
        ],
        installments: 6
    },
    external_reference: 'nain.lobato.g@gmail.com',
    auto_return: 'approved',
    back_urls: {
        success: `${url}/success`,
        pending: `${url}/pending`,
        failure: `${url}/failure`,
    },
    notification_url: `${url}/notify`,
  });
  
  const createPreferences = (title, price, img, url) => {
    const preference = mapPreference(title, price, img, url);
    return mercadopago.preferences.create(preference)
    .then((response) => response.body)
    .catch(function(error){
        console.log(error);
    });
  }

  module.exports = { createPreferences };
 