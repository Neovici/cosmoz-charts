import cfg from '@neovici/cfg/web/test-runner.mjs';
import { replace } from './web-dev-server.config.mjs';

export default {
	...cfg,
	plugins: [...cfg.plugins, replace],
};
