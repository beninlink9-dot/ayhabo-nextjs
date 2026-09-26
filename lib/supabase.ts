const SUPABASE_PROJECT_URL =
  "https://uzgvlbhfevxfacnnadtc.supabase.co";

const FUNCTIONS_BASE_URL =
  `${SUPABASE_PROJECT_URL}/functions/v1`;

export const supabaseConfig = Object.freeze({
  projectUrl: SUPABASE_PROJECT_URL,
  gatewayUrl: `${FUNCTIONS_BASE_URL}/nigerex-security-proxy`,
  trackingUrl: `${FUNCTIONS_BASE_URL}/nigerex-order-tracking-v1`,
  marketingPublicUrl: `${FUNCTIONS_BASE_URL}/nigerex-marketing-public-v1`,
  bannersUrl: `${FUNCTIONS_BASE_URL}/nigerex-banners-v2`,
  adRegieUrl: `${FUNCTIONS_BASE_URL}/nigerex-ad-regie-v1`,
  blogUrl: `${FUNCTIONS_BASE_URL}/nigerex-blog-v1`,
  servicesUrl: `${FUNCTIONS_BASE_URL}/nigerex-services-v1`,
  adminPaymentsUrl: `${FUNCTIONS_BASE_URL}/nigerex-security-proxy/admin/payments/list`,
});
