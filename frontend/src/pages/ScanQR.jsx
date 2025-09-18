// import { api } from '@/apiBase';
// import React, { useState, useRef, useEffect } from 'react';
// import { QrCode, Camera, X } from 'lucide-react';
// import jsQR from 'jsqr';




// function QRScanner({ onBack, isDark, onToggleTheme }) {
//   const [isActive, setIsActive] = useState(false);
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState('');
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);
//   useEffect(() => {
//     if (isActive && videoRef.current) {
//     console.log('📸 Starting camera after video is ready');
//     startCamera();
//    }
//   }, [isActive]);


//   const startCamera = async () => {
//   console.log('📸 Start Camera button clicked');
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//     if (videoRef.current) {
//       videoRef.current.srcObject = stream;
//       console.log('✅ Stream bound to video element');
//     } else {
//       console.warn('⚠️ videoRef is null');
//     }
//   } catch (err) {
//     console.error('❌ Camera error:', err);
//     setError('Unable to access camera. Please check permissions.');
//   }
// };


//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//     }
    
//     if (videoRef.current && videoRef.current.scanInterval) {
//       clearInterval(videoRef.current.scanInterval);
//     }
    
//     setIsActive(false);
//   };

//   const scanQRCode = () => {
//     if (!videoRef.current || !canvasRef.current || !isActive) return;

//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
    
//     if (video.readyState === video.HAVE_ENOUGH_DATA) {
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
//       const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      
//       // Simple QR detection simulation (in real app, use jsQR library)
//       // For demo purposes, we'll simulate finding a QR code
//       if (Math.random() > 0.95) { // 5% chance to "find" QR code
//         const mockCID = 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi';
//         handleScan(mockCID);
//       }
//     }
//   };

//   const handleScan = async (data) => {
//     if (!data) return;
    
//     console.log('Scanned:', data);
//     setError('');
    
//     try {
//       // Extract CID from URL if it's a full URL
//       let cid = data;
//       if (data.includes('ipfs/')) {
//         cid = data.split('ipfs/')[1];
//       }
      
//       // Verify the CID by fetching data
//       const response = await fetch(api(`/api/medicine/cid/${cid}`));
//       if (response.ok) {
//         const result = await response.json();
//         setResults({ cid, data: result });
//         stopCamera(); // Stop camera after successful scan
//       } else {
//         setError('Invalid QR code or record not found');
//       }
//     } catch (err) {
//       console.error('Scan verification error:', err);
//       setError('Failed to verify scanned code');
//     }
//   };

//   const handleError = (err) => {
//     console.error('Scanner Error:', err);
//     setError('Scanner error occurred');
//   };

//   return (
//     <div className={`min-h-screen p-6 transition-colors ${
//       isDark 
//         ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white' 
//         : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
//     }`}>
//       <div className="max-w-2xl mx-auto">
//         <div className="text-center mb-8">
//           <h2 className={`text-3xl font-bold mb-4 bg-clip-text text-transparent ${
//             isDark 
//               ? 'bg-gradient-to-r from-purple-400 to-indigo-500' 
//               : 'bg-gradient-to-r from-purple-600 to-indigo-600'
//           }`}>
//             QR Code Scanner
//           </h2>
//           <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//             Scan QR codes to verify medical records
//           </p>
//         </div>

//         <div className={`backdrop-blur-md border rounded-2xl p-6 mb-6 ${
//           isDark 
//             ? 'bg-gray-900/50 border-gray-800/50' 
//             : 'bg-white/80 border-gray-200/50'
//         }`}>
//           {/* Scanner Area */}
//           <div className={`relative w-80 h-80 mx-auto mb-6 rounded-xl border-2 border-dashed bg-black ${
//            isDark ? 'border-gray-600' : 'border-gray-400'
//           }`}>

//             {isActive ? (
//               <>
//                  <video
//                   ref={videoRef}
//                   autoPlay
//                   playsInline
//                   muted
//                    className="w-full h-full object-cover bg-black"
//                    style={{ display: 'block' }}
//                 />

//                 <canvas
//                   ref={canvasRef}
//                   className="hidden"
//                 />
//                 {/* Scanning overlay */}
//                 <div className="absolute inset-0 pointer-events-none">
//                   <div className="absolute inset-4 border-2 border-cyan-400 rounded-lg">
//                     <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400 rounded-tl-lg"></div>
//                     <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400 rounded-tr-lg"></div>
//                     <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400 rounded-bl-lg"></div>
//                     <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400 rounded-br-lg"></div>
//                   </div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="w-full h-1 bg-cyan-400 opacity-50 animate-pulse"></div>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center">
//                   <QrCode size={80} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
//                   <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                     Camera will appear here
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Controls */}
//           <div className="text-center space-y-4">
//             <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//               {isActive 
//                 ? 'Point your camera at a QR code' 
//                 : 'Click to activate camera and scan QR codes'
//               }
//             </p>
// <button
//   onClick={() => setIsActive(!isActive)}
//   className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 mx-auto ${
//     isActive
//       ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
//       : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
//   } text-white hover:scale-105`}
// >
//   {isActive ? <X size={20} /> : <Camera size={20} />}
//   {isActive ? 'Stop Camera' : 'Start Camera'}
// </button>

//           </div>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div className={`p-4 rounded-xl mb-6 ${
//             isDark 
//               ? 'bg-red-900/50 border border-red-700/50 text-red-300' 
//               : 'bg-red-50 border border-red-200 text-red-700'
//           }`}>
//             <p className="font-medium">{error}</p>
//           </div>
//         )}

//         {/* Results Display */}
//         {results && (
//           <div className={`backdrop-blur-md border rounded-2xl p-6 mb-6 ${
//             isDark 
//               ? 'bg-gray-900/50 border-gray-800/50' 
//               : 'bg-white/80 border-gray-200/50'
//           }`}>
//             <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
//               Scan Result
//             </h3>
            
//             <div className="space-y-3">
//               <div>
//                 <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                   CID:
//                 </p>
//                 <code className={`text-sm ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
//                   {results.cid}
//                 </code>
//               </div>
              
//               <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
//                 <pre className={`text-sm overflow-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                   {JSON.stringify(results.data, null, 2)}
//                 </pre>
//               </div>
              
//               <button
//                 onClick={() => window.open(`https://gateway.pinata.cloud/ipfs/${results.cid}`, '_blank')}
//                 className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium hover:from-green-600 hover:to-teal-700 transition-all duration-300"
//               >
//                 View on IPFS
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="flex justify-between items-center mt-8">
//           <button 
//             onClick={onBack} 
//             className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
//               isDark 
//                 ? 'bg-gray-800/50 hover:bg-gray-800/70 text-white' 
//                 : 'bg-gray-200/50 hover:bg-gray-200/70 text-gray-900'
//             }`}
//           >
//             Back to Dashboard
//           </button>
//           <button 
//             onClick={onToggleTheme} 
//             className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
//               isDark 
//                 ? 'bg-gray-800/50 hover:bg-gray-800/70 text-white' 
//                 : 'bg-gray-200/50 hover:bg-gray-200/70 text-gray-900'
//             }`}
//           >
//             {isDark ? 'Light' : 'Dark'} Mode
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useRef, useEffect } from 'react';
// import jsQR from 'jsqr';
// import { QrCode, Camera, X } from 'lucide-react';
// import { api } from '@/apiBase';

// export default function ScanQR() {
//   const [isActive, setIsActive] = useState(false);
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState('');
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);

//   useEffect(() => {
//     if (isActive) startCamera();
//     return () => stopCamera();
//   }, [isActive]);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
//       streamRef.current = stream;
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//         videoRef.current.scanInterval = setInterval(scanQRCode, 1000);
//       }
//     } catch (err) {
//       console.error('❌ Camera error:', err);
//       setError('Unable to access camera. Please check permissions.');
//     }
//   };

//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//     }
//     if (videoRef.current?.scanInterval) {
//       clearInterval(videoRef.current.scanInterval);
//     }
//     setIsActive(false);
//   };

//   const scanQRCode = () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');

//     if (video.readyState === video.HAVE_ENOUGH_DATA) {
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//       const code = jsQR(imageData.data, canvas.width, canvas.height);
//       if (code?.data) handleScan(code.data);
//     }
//   };

//   const handleScan = async (data) => {
//     if (!data) return;
//     console.log('📦 Scanned QR:', data);
//     setError('');

//     let cid = data;
//     let type = 'donor';

//     try {
//       const parsed = JSON.parse(data);
//       if (parsed?.value) {
//         cid = parsed.value;
//         type = parsed.type || 'donor';
//       } else if (data.includes('ipfs/')) {
//         cid = data.split('ipfs/')[1];
//       }
//     } catch {
//       if (data.includes('ipfs/')) {
//         cid = data.split('ipfs/')[1];
//       }
//     }

//     try {
//       const response = await fetch(api(`/api/${type}/${cid}`));
//       if (response.ok) {
//         const result = await response.json();
//         setResults({ cid, data: result });
//         stopCamera();
//       } else {
//         setError('Invalid QR code or record not found');
//       }
//     } catch (err) {
//       console.error('❌ Verification error:', err);
//       setError('Failed to verify scanned code');
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">📷 Scan QR</h2>

//       <div className="relative w-80 h-80 mx-auto mb-4 border-2 border-dashed rounded-xl bg-black">
//         {isActive ? (
//           <>
//             <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
//             <canvas ref={canvasRef} style={{ display: 'none' }} />
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-400">
//             <QrCode size={64} />
//             <p className="ml-4">Camera will appear here</p>
//           </div>
//         )}
//       </div>

//       <div className="text-center mb-6">
//         <button
//           onClick={() => setIsActive(!isActive)}
//           className={`px-6 py-2 rounded-lg font-medium text-white ${
//             isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           {isActive ? <X size={18} className="inline mr-2" /> : <Camera size={18} className="inline mr-2" />}
//           {isActive ? 'Stop Camera' : 'Start Camera'}
//         </button>
//       </div>

//       {error && <div className="p-3 rounded bg-red-100 text-red-700 mb-4">{error}</div>}

//       {results && (
//         <div className="p-4 rounded bg-gray-100">
//           <p className="text-sm font-semibold">CID:</p>
//           <code className="block mb-2 text-blue-600">{results.cid}</code>
//           <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(results.data, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }


// // export default ScanQR;
import React, { useState, useRef, useEffect } from 'react';
import jsQR from 'jsqr';
import { QrCode, Camera, X } from 'lucide-react';
import { api } from '@/apiBase';

export default function ScanQR() {
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isActive]);

  const startCamera = async () => {
    try {
      setError('');
      const constraints = {
        video: {
          facingMode: 'environment', // Back camera for better QR scanning
          width: { ideal: 1280 },
          height: { ideal: 720 },
          aspectRatio: { ideal: 16/9 }
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          // Start scanning after video is ready
          scanIntervalRef.current = setInterval(scanQRCode, 500); // Scan every 500ms
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError(`Camera access failed: ${err.message}. Please allow camera permission and try again.`);
      setIsActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current || !isActive) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { willReadFrequently: true });

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      const { videoWidth, videoHeight } = video;
      
      // Set canvas size to match video
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      
      // Draw current video frame to canvas
      context.drawImage(video, 0, 0, videoWidth, videoHeight);
      
      // Get image data for QR detection
      const imageData = context.getImageData(0, 0, videoWidth, videoHeight);
      
      // Attempt to decode QR code
      const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      
      if (qrCode && qrCode.data) {
        console.log('QR Code detected:', qrCode.data);
        handleScan(qrCode.data);
      }
    }
  };

  const handleScan = async (data) => {
    if (!data) return;
    
    console.log('Scanned QR:', data);
    setError('');
    stopCamera(); // Stop camera immediately after successful scan
    setIsActive(false);

    let cid = data;
    let type = 'donor';

    try {
      // Try to parse as JSON first (structured QR codes)
      const parsed = JSON.parse(data);
      if (parsed && parsed.value) {
        cid = parsed.value;
        type = parsed.type || 'donor';
      }
    } catch {
      // If not JSON, check if it's a direct IPFS URL
      if (data.includes('ipfs/')) {
        cid = data.split('ipfs/')[1];
      } else if (data.includes('gateway.pinata.cloud')) {
        const urlParts = data.split('/');
        cid = urlParts[urlParts.length - 1];
      }
      // If starts with Qm or baf, it's likely a direct CID
      else if (data.match(/^(Qm[a-zA-Z0-9]{44}|baf[a-zA-Z0-9]+)$/)) {
        cid = data;
      }
    }

    console.log('Extracted CID:', cid);

    try {
      // Try different API endpoints based on type and fallback options
      const endpoints = [
        { url: `/api/verify/verify/${cid}`, name: 'Verify API' },
        { url: `/api/${type}/${cid}`, name: `${type} API` }, 
        { url: `/api/medicine/cid/${cid}`, name: 'Medicine API' },
        { url: `/api/verify/${cid}`, name: 'Simple Verify API' }
      ];
      
      let lastError = null;
      
      for (const endpoint of endpoints) {
        try {
          console.log(`Trying endpoint: ${endpoint.name} - ${endpoint.url}`);
          const response = await fetch(api(endpoint.url));
          
          if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const result = await response.json();
              console.log(`Success with ${endpoint.name}:`, result);
              setResults({ cid, data: result, type, endpoint: endpoint.url, originalData: data });
              return;
            } else {
              console.log(`${endpoint.name} returned non-JSON response`);
            }
          } else {
            console.log(`${endpoint.name} returned status: ${response.status}`);
          }
        } catch (e) {
          console.log(`Failed endpoint ${endpoint.name}:`, e.message);
          lastError = e;
        }
      }
      
      // If all endpoints failed, try to fetch directly from IPFS
      try {
        console.log('Trying direct IPFS access...');
        const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;
        const ipfsResponse = await fetch(ipfsUrl);
        
        if (ipfsResponse.ok) {
          const contentType = ipfsResponse.headers.get('content-type');
          let ipfsData;
          
          if (contentType && contentType.includes('application/json')) {
            ipfsData = await ipfsResponse.json();
          } else {
            ipfsData = await ipfsResponse.text();
          }
          
          console.log('IPFS data retrieved:', ipfsData);
          setResults({ 
            cid, 
            data: ipfsData, 
            type: 'ipfs-direct', 
            endpoint: 'Direct IPFS',
            note: 'Retrieved directly from IPFS gateway'
          });
          return;
        }
      } catch (ipfsError) {
        console.log('IPFS direct access failed:', ipfsError.message);
      }
      
      setError(`Unable to verify QR code. API endpoints may be offline. Last error: ${lastError?.message || 'Unknown error'}`);
      
    } catch (err) {
      console.error('Verification error:', err);
      setError(`Verification failed: ${err.message}`);
    }
  };

  const toggleCamera = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setResults(null); // Clear previous results when starting new scan
      setError('');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📷 Scan QR Code</h2>
      <p className="text-gray-600 mb-6">Point your camera at a QR code to verify medical records</p>

      {/* Scanner Area */}
      <div className="relative w-full max-w-md mx-auto mb-6">
        <div className="relative aspect-square border-2 border-dashed border-gray-300 rounded-xl bg-black overflow-hidden">
          {isActive ? (
            <>
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover"
              />
              <canvas 
                ref={canvasRef} 
                className="hidden"
              />
              
              {/* Scanning Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-4 border-2 border-cyan-400 rounded-lg">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400 rounded-br-lg"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-1 bg-cyan-400 opacity-50 animate-pulse"></div>
                </div>
              </div>
              
              {/* Scanning Status */}
              <div className="absolute bottom-4 left-0 right-0">
                <div className="text-center">
                  <div className="inline-block px-3 py-1 bg-black/50 rounded-full text-white text-sm">
                    🔍 Scanning for QR codes...
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <QrCode size={64} className="mx-auto mb-2" />
                <p>Camera will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="text-center mb-6">
        <button
          onClick={toggleCamera}
          className={`px-6 py-3 rounded-lg font-medium text-white flex items-center gap-2 mx-auto transition-all ${
            isActive 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isActive ? <X size={18} /> : <Camera size={18} />}
          {isActive ? 'Stop Camera' : 'Start Camera'}
        </button>
        
        <p className="text-sm text-gray-600 mt-2">
          {isActive 
            ? 'Point your camera at a QR code to scan' 
            : 'Click to activate camera and scan QR codes'
          }
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 mb-6">
          <p className="font-medium">⚠️ {error}</p>
        </div>
      )}

      {/* Results Display */}
      {results && (
        <div className="p-6 rounded-lg bg-gray-50 border border-gray-200">
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            ✅ Scan Result
          </h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600">CID:</p>
              <code className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded break-all">
                {results.cid}
              </code>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-600">Type:</p>
              <span className="text-sm text-green-600 font-medium">{results.type}</span>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-600">Source:</p>
              <code className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                {results.endpoint}
              </code>
            </div>
            
            {results.note && (
              <div>
                <p className="text-sm font-medium text-gray-600">Note:</p>
                <p className="text-sm text-orange-600">{results.note}</p>
              </div>
            )}
            
            <div className="p-3 rounded bg-white border">
              <p className="text-sm font-medium text-gray-600 mb-2">Data:</p>
              <div className="max-h-60 overflow-auto">
                {typeof results.data === 'string' ? (
                  <div className="text-sm text-gray-700">
                    {results.data.length > 500 
                      ? `${results.data.substring(0, 500)}...` 
                      : results.data
                    }
                  </div>
                ) : (
                  <pre className="text-xs text-gray-700">
                    {JSON.stringify(results.data, null, 2)}
                  </pre>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => window.open(`https://gateway.pinata.cloud/ipfs/${results.cid}`, '_blank')}
                className="flex-1 py-2 px-4 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                📋 View on IPFS
              </button>
              <button
                onClick={() => {
                  setResults(null);
                  setError('');
                }}
                className="py-2 px-4 rounded bg-gray-600 text-white font-medium hover:bg-gray-700 transition-colors"
              >
                🔄 Scan Again
              </button>
            </div>
            
            {/* Debug Info */}
            <details className="text-xs text-gray-500">
              <summary className="cursor-pointer hover:text-gray-700">Debug Info</summary>
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <p><strong>Original QR Data:</strong> {results.originalData || 'N/A'}</p>
                <p><strong>Extracted CID:</strong> {results.cid}</p>
                <p><strong>Detection Method:</strong> {results.endpoint}</p>
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}