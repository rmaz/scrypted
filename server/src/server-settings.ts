import os from 'os';

export const SCRYPTED_INSECURE_PORT = parseInt(process.env.SCRYPTED_INSECURE_PORT) || 11080;
export const SCRYPTED_SECURE_PORT = parseInt(process.env.SCRYPTED_SECURE_PORT) || 10443;
export const SCRYPTED_DEBUG_PORT = parseInt(process.env.SCRYPTED_DEBUG_PORT) || 10081;
export const SCRYPTED_IP_ADDRESS = process.env.SCRYPTED_IP_ADDRESS;

export function getIpAddress(): string {
    if (SCRYPTED_IP_ADDRESS) 
        return SCRYPTED_IP_ADDRESS;

    const ni = os.networkInterfaces();
    for (const i of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
        let ipv4: os.NetworkInterfaceInfo;
        let ipv6: os.NetworkInterfaceInfo;
        for (const en of (ni[`en${i}`] || [])) {
            if (en.family === 'IPv4')
                ipv4 = en;
            else if (en.family === 'IPv6')
                ipv6 = en;
        }

        if (ipv4 || ipv6)
            return (ipv4 || ipv6).address;
    }

    return '127.0.0.1';
}
