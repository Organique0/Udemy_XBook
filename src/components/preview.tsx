import * as React from 'react';
import { useEffect } from 'react';
import './preview.css';
const html = `
    <html>
      <head>
        <style>html {background-color:gainsboro}</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }
        }, false);
        </script>
      </body>
    </html>
  `

interface PreviewProps {
  code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iFrame = React.useRef<any>();

  useEffect(() => {
    iFrame.current.srcdoc = html;
    setTimeout(() => {
      iFrame.current.contentWindow.postMessage(code, '*');
    }, 50)
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe title='preview' ref={iFrame} sandbox='allow-scripts' srcDoc={html} />
    </div>

  )
}

export default Preview;