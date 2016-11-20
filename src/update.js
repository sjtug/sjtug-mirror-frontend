import config from './config';
import mutations from './mutations';

export default {
    updateMirrorListRoutine() {
        mutations.updateMirrorList();
        setTimeout(this.updateMirrorListRoutine, config.updateInterval);
    },

    start() {
        this.updateMirrorListRoutine();
    },
};
