import {PORT, ENABLE_HOT_LOADING, HOT_LOADER_PORT, APP_SRC, PROJECT_ROOT, APP_DEST} from '../config';
import {join} from 'path';
import * as ng2HotLoader from 'angular2-hot-loader';
import * as browserSync from 'browser-sync';

let runServer = () => {
  let routes:any = {
    [`/${APP_DEST}`]: APP_DEST,
    '/node_modules': 'node_modules'
  };
  browserSync({
    port: PORT,
    startPath: '/',
    server: {
      baseDir: APP_DEST,
      routes: routes
    }
  });
};

let listen = () => {
  if (ENABLE_HOT_LOADING) {
    ng2HotLoader.listen({
      port: HOT_LOADER_PORT,
      processPath: file => {
        return file.replace(join(PROJECT_ROOT, APP_SRC), join('dist', 'dev'));
      }
    });
  }
  runServer();
};

let changed = files => {
  if (!(files instanceof Array)) {
    files = [files];
  }
  if (ENABLE_HOT_LOADING) {
    ng2HotLoader.onChange(files);
  } else {
    browserSync.reload(files);
  }
};

export { listen, changed };
