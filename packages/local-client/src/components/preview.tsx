
import { useEffect, useRef } from 'react';
import '../styles/preview.css';
import IFrameHTML from '../../src/IFrameHTML.html?raw'; //import directly as a raw string

interface PreviewProps {
  code: string;
  bundleError: string | undefined;
}

const Preview: React.FC<PreviewProps> = ({ code, bundleError }) => {
  const iFrame = useRef<any>();

  useEffect(() => {
    if (iFrame.current) {
      setTimeout(() => {
        iFrame.current.contentWindow.postMessage(code, '*');
      }, 20);
    }
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe title='preview' ref={iFrame} sandbox='allow-scripts' srcDoc={IFrameHTML} />
      {bundleError && <div className='preview-error'>{bundleError}</div>}
    </div>

  )
}

export default Preview;