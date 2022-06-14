import Cookies from 'js-cookie';
import {v4 as uuidv4} from 'uuid';

if (!Cookies.get('guest_uuid')) {
  if (process.client) {
    Cookies.set('guest_uuid', uuidv4());
  }
}
