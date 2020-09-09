import NodeCache = require("node-cache");

export var tokenCache: NodeCache;

export function initCache() {
    tokenCache = new NodeCache({
        stdTTL: 86400,
        deleteOnExpire: true,
        useClones: false
    });
}
