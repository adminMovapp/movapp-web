export const hashData = async (data) => {
   if (!data) return null;
   const normalized = data.toLowerCase().trim();
   const buffer = new TextEncoder().encode(normalized);
   const hash = await crypto.subtle.digest('SHA-256', buffer);
   return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
};

export const createUserData = async (email, phone, firstName, lastName, zipCode) => {
   return {
      em: email ? await hashData(email) : null,
      ph: phone ? await hashData(phone) : null,
      fn: firstName ? await hashData(firstName) : null,
      ln: lastName ? await hashData(lastName) : null,
      zp: zipCode ? await hashData(zipCode) : null,
   };
};

export const sendConversionEvent = async (
   pixelId,
   accessToken,
   eventName,
   userData,
   customData = {},
   eventSourceUrl = '',
   eventId = null,
) => {
   const payload = {
      data: [
         {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            user_data: userData,
            custom_data: customData,
            event_source_url: eventSourceUrl,
            action_source: 'website',
            event_id: eventId,
         },
      ],
      access_token: accessToken,
   };

   const res = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
   });

   return await res.json();
};

export const trackServerPurchase = async (
   pixelId,
   accessToken,
   userData,
   value,
   currency = 'MXN',
   contentIds = [],
   eventSourceUrl = '',
   eventId = null,
) => {
   return await sendConversionEvent(
      pixelId,
      accessToken,
      'Purchase',
      userData,
      {
         value: parseFloat(value),
         currency,
         content_ids: contentIds,
         content_type: 'product',
      },
      eventSourceUrl,
      eventId,
   );
};
