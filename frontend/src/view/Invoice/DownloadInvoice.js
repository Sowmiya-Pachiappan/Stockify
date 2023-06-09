import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Invoice } from './Invoice';

const DownloadInvoice = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <Invoice ref={componentRef} />
    </div>
  );
};
export default DownloadInvoice;
