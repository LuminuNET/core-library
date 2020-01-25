import * as Redis from './common/redis.service';
import * as Locale from './common/locale.service';
import Buffer from './common/buffer.service';

const Frontend = {
  Locale
};

const Backend = {
  Redis,
  Buffer
};

export { Frontend, Backend };
