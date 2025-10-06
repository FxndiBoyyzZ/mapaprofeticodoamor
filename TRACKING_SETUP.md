# 📊 Guia de Configuração do Sistema de Tracking

Este guia explica como configurar o sistema completo de rastreamento Meta Ads (Facebook Pixel + CAPI) implementado no projeto.

## 🔧 Configurações Necessárias

### 1. Google Tag Manager (GTM)

**Arquivo:** `index.html` (linha 10)

```html
<!-- Substitua {{GTM_ID}} pelo seu ID real -->
'https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX'
```

**Como obter:**
- Acesse [Google Tag Manager](https://tagmanager.google.com/)
- Crie um container para seu site
- Copie o ID (formato: `GTM-XXXXXXX`)

---

### 2. Meta Pixel (Facebook Pixel)

**Arquivo:** `index.html` (linha 24)

```javascript
// Substitua {{PIXEL_ID}} pelo seu Pixel ID
fbq('init', '1234567890123456');
```

**Como obter:**
- Acesse [Meta Events Manager](https://business.facebook.com/events_manager/)
- Vá em "Origens de Dados" > "Pixel"
- Copie o ID do Pixel (números de 15-16 dígitos)

---

### 3. CAPI Webhook (Meta Conversions API)

**Arquivo:** `src/lib/capi.ts` (linha 9)

```typescript
const CAPI_WEBHOOK_URL = "https://sua-funcao-cloud.com/capi";
```

**Opções de implementação:**

#### Opção A: Make.com / Zapier (Recomendado para MVP)
1. Crie um cenário no Make.com com webhook
2. Configure o módulo "HTTP Request" para enviar para Meta CAPI:
   - URL: `https://graph.facebook.com/v18.0/{PIXEL_ID}/events`
   - Method: `POST`
   - Headers: `Authorization: Bearer {ACCESS_TOKEN}`
3. Use o webhook URL no código

#### Opção B: Lovable Cloud (Edge Function)
```typescript
// Crie uma edge function em Lovable Cloud
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const data = await req.json();
  
  const response = await fetch(
    `https://graph.facebook.com/v18.0/{PIXEL_ID}/events`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer {ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        data: [data],
        test_event_code: 'TEST12345', // Remova em produção
      }),
    }
  );

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
```

#### Opção C: Backend próprio (Node.js, Python, etc.)
Implemente um endpoint POST que receba os dados e envie para Meta CAPI.

**Access Token necessário:**
- Gere no Meta Business Manager
- Vai em "Configurações de Negócios" > "Origens de Dados" > "Pixel" > "Configurações" > "Conversions API"

---

### 4. URLs de Checkout

**Arquivo:** `src/pages/Checkout.tsx` (linha 10)

```typescript
const CHECKOUT_URL = "https://pay.hotmart.com/SEU_CODIGO_PRODUTO";
```

**Arquivo:** `src/pages/Upsell.tsx` (linha 12)

```typescript
const CHECKOUT_URL_UPSELL = "https://pay.hotmart.com/SEU_CODIGO_UPSELL";
```

**Como obter:**
- Hotmart: Acesse "Produtos" > selecione produto > copie link de checkout
- Outros: Use sua URL de checkout configurada

---

### 5. WhatsApp (Opcional)

**Arquivo:** `src/pages/Checkout.tsx` (linha 11)

```typescript
const WHATSAPP_URL = "https://wa.me/5511999999999";
```

Substitua pelo número com código do país (55 para Brasil).

---

## 🚀 Fluxo de Eventos Implementado

### 1. PageView
- **Dispara:** Todas as páginas (automático)
- **Pixel:** ✅
- **CAPI:** ✅

### 2. ViewContent
- **Dispara:** Landing page, página de resultado, upsell
- **Pixel:** ✅
- **CAPI:** ✅
- **Dados:** `content_name`, `content_category`

### 3. Lead
- **Dispara:** Ao concluir o quiz (antes de ir para /resultado)
- **Pixel:** ✅
- **CAPI:** ✅
- **Dados:** `event_id` único, `em` (email hash), `fbp`, `fbc`

### 4. InitiateCheckout
- **Dispara:** Ao clicar "Desbloquear meu Mapa" ou "Ir para pagamento"
- **Pixel:** ✅
- **CAPI:** ✅
- **Dados:** `value: 47`, `currency: BRL`

### 5. Purchase
- **Dispara:** Na página /obrigado (confirmação)
- **Pixel:** ✅
- **CAPI:** ✅
- **Dados:** `value: 47`, `currency: BRL`, **mesmo `event_id` do Lead** (deduplicação)

---

## 🔐 Sistema de Consentimento

### Banner de Cookies
- Aparece automaticamente na primeira visita
- Armazena escolha no `localStorage` como `cookie_consent`
- Eventos só disparam após aceite

### LGPD Compliance
- Páginas de Privacidade e Termos criadas
- Links no rodapé
- Hash SHA256 automático de emails/telefones

---

## 📊 Propagação de Parâmetros

Todos os CTAs de checkout propagam automaticamente:

```
?utm_source=facebook
&utm_medium=cpc
&utm_campaign=mapa-profetico
&fbclid=ABC123
&fbp=fb.1.1234567890.1234567890
&fbc=fb.1.1234567890.ABC123
&event_id=uuid-v4-aqui
&em=hash-sha256-email
```

---

## 🧪 Testando o Sistema

### 1. Verificar Pixel no navegador

```javascript
// Console do navegador
window.dataLayer // Ver dados do GTM
window.fbq // Verificar Pixel carregado
localStorage.getItem('tracking_data') // Ver dados capturados
```

### 2. Meta Events Manager
- Acesse [Events Manager](https://business.facebook.com/events_manager/)
- Vá em "Test Events"
- Use o código de teste: `TEST12345`
- Navegue pelo site e veja eventos em tempo real

### 3. CAPI Logs (DEV)
- Abra o console do navegador
- Eventos CAPI logam `[CAPI] Event sent successfully: NomeEvento`
- Erros aparecem como `[CAPI] Failed to send event`

---

## 🐛 Troubleshooting

### Eventos não aparecem no Meta
1. Verifique se o Pixel ID está correto
2. Confirme que o consentimento foi dado
3. Limpe cache e cookies do navegador
4. Use o Meta Pixel Helper (extensão Chrome)

### CAPI não funciona
1. Verifique o webhook URL
2. Confirme Access Token válido
3. Veja logs do console (DEV)
4. Teste o endpoint manualmente (Postman)

### UTMs não propagam
1. Verifique console: `localStorage.getItem('tracking_data')`
2. Teste URL com parâmetros: `/?utm_source=test&fbclid=123`
3. Limpe localStorage e recarregue

---

## 📈 Otimizações em Produção

### Performance
- ✅ Tracking < 8KB minificado
- ✅ CAPI usa `requestIdleCallback`
- ✅ Retry automático com backoff exponencial
- ✅ Timeout de 1500ms

### Privacidade
- ✅ Hash SHA256 de PII (email/phone)
- ✅ Banner de consentimento
- ✅ TTL de 7 dias no localStorage
- ✅ IP não é capturado no browser (CAPI cuida)

---

## 📝 Checklist Final

- [ ] GTM_ID configurado em `index.html`
- [ ] PIXEL_ID configurado em `index.html`
- [ ] CAPI_WEBHOOK configurado em `src/lib/capi.ts`
- [ ] CHECKOUT_URL configurado em `src/pages/Checkout.tsx`
- [ ] CHECKOUT_URL_UPSELL configurado em `src/pages/Upsell.tsx`
- [ ] WHATSAPP_URL configurado (opcional)
- [ ] Test Events funcionando no Meta Events Manager
- [ ] Deduplicação validada (mesmo event_id em Lead e Purchase)
- [ ] Banner de cookies testado
- [ ] Páginas de Privacidade e Termos revisadas

---

## 🆘 Suporte

Para dúvidas sobre implementação:
- Meta CAPI Docs: https://developers.facebook.com/docs/marketing-api/conversions-api
- GTM Docs: https://developers.google.com/tag-manager
- Meta Pixel Helper: https://chrome.google.com/webstore (busque "Meta Pixel Helper")

---

**Última atualização:** {new Date().toLocaleDateString('pt-BR')}
