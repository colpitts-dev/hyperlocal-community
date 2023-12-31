export async function handler() {
  return {
    statusCode: 200,
    headers: {
      /* Required for CORS support to work */
      'Access-Control-Allow-Origin': '*',
      /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      message: '--H-Y-P-E-R-L-O-C-A-L--C-O-M-M-U-N-I-T-Y--',
    }),
  }
}
