import Image from 'next/image';
import { checkCredentials } from './lib/loginfunc';
import { readDataFromLogin } from './lib/SelectData';
import { WhereID } from './lib/WhereID';

const inputId = 'admin';
let rufrhk = '';

WhereID(inputId, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    rufrhk = data;
    console.log(rufrhk);
  }
});

export default function Home() {
  return (
    <div id="root">
      <p>{rufrhk}</p>
    </div>
  );
}
