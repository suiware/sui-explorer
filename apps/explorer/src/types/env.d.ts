interface Window {
  // This is needed in order to extend the window object with the __ENV__ object,
  // which contains the environment variables.
  //
  // See also: /apps/explorer/public/env-config.js
  // See also: /docker-entrypoint.sh
  __ENV__?: {
    SUI_RPC_URL?: string;
    // Add other runtime config variables here
  };
}
