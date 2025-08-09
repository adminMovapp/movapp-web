export const hashData = async (data) => {
   if (!data) return null;

   const normalizedData = data.toLowerCase().trim();
   const encoder = new TextEncoder();
   const dataBuffer = encoder.encode(normalizedData);

   try {
      // Usar Web Crypto API
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
      return hashHex;
   } catch (error) {
      console.error('Error hashing data:', error);
      return null;
   }
};

// Crear datos de usuario
export const createUserData = async (email, phone, firstName, lastName, zipCode) => {
   return {
      em: email ? await hashData(email) : null,
      ph: phone ? await hashData(phone) : null,
      fn: firstName ? await hashData(firstName) : null,
      ln: lastName ? await hashData(lastName) : null,
      zp: zipCode ? await hashData(zipCode) : null,
   };
};

// Enviar evento a la API de Conversiones
export const sendConversionEvent = async (
   pixelId,
   accessToken,
   eventName,
   userData,
   customData = {},
   eventSourceUrl = '',
) => {
   const eventTime = Math.floor(Date.now() / 1000);
   const apiUrl = `https://graph.facebook.com/v18.0/${pixelId}/events`;

   const eventData = {
      event_name: eventName,
      event_time: eventTime,
      event_source_url: eventSourceUrl,
      user_data: userData,
      custom_data: customData,
      action_source: 'website',
   };

   const payload = {
      data: [eventData],
      access_token: accessToken,
   };

   try {
      const response = await fetch(apiUrl, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('Meta API response:', result);
      return result;
   } catch (error) {
      console.error('Error sending Meta Conversion API event:', error);
      throw error;
   }
};

// Trackear compra (servidor)
export const trackServerPurchase = async (
   pixelId,
   accessToken,
   userData,
   value,
   currency = 'MXN',
   contentIds = [],
   eventSourceUrl = '',
) => {
   const customData = {
      value: parseFloat(value),
      currency: currency,
      content_ids: contentIds,
      content_type: 'product',
   };

   return await sendConversionEvent(pixelId, accessToken, 'Purchase', userData, customData, eventSourceUrl);
};
