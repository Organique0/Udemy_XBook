
import { useEffect, useState, useRef } from 'react';
import '../styles/preview.css';

interface PreviewProps {
  code: string;
  bundleError: string | undefined;
}

const Preview: React.FC<PreviewProps> = ({ code, bundleError }) => {
  const iFrame = useRef<any>();
  const htmlFileRef = useRef<string>();
  const [loading, setLoading] = useState<boolean>(false);

  //all of this just because I want to have html in a separate file
  async function fetchHtml() {
    try {
      const response = await fetch(`IFrameHTML.html`);
      if (response.ok) {
        const html = await response.text();
        htmlFileRef.current = html; // Store HTML content in the ref
      } else {
        throw new Error('Failed to fetch HTML');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await fetchHtml();
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (iFrame.current && htmlFileRef.current) {
      iFrame.current.srcdoc = htmlFileRef.current; // Update iframe srcdoc
      setTimeout(() => {
        iFrame.current.contentWindow.postMessage(code, '*');
      }, 20);
    }
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe title='preview' ref={iFrame} sandbox='allow-scripts' srcDoc={htmlFileRef.current} />
      {bundleError && <div className='preview-error'>{bundleError}</div>}
      {loading && <div className='preview-loading'>Loading...</div>}
    </div>

  )
}

export default Preview;