"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, RefreshCcw } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface IDCardProps {
  name: string;
  email: string;
  photoUrl: string;
  role?: string;
  referralCode?: string;
}

export default function IDCard({ name, email, photoUrl, role = "Growth Fellow", referralCode }: IDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const downloadCard = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    
    // Temporarily ensure it's not flipped for the download (people usually want the front)
    const wasFlipped = isFlipped;
    if (wasFlipped) setIsFlipped(false);

    try {
      // Wait a tiny bit for state to settle if it was flipped
      if (wasFlipped) await new Promise(r => setTimeout(r, 300));
      
      const dataUrl = await toPng(cardRef.current, { 
        quality: 1, 
        pixelRatio: 3,
        style: { transform: 'scale(1)', transformOrigin: 'top left' }
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `BSPrep_ID_${name.replace(/\s+/g, "_")}.png`;
      link.click();
    } catch (error) {
      console.error("Failed to download ID card", error);
      alert("Failed to generate ID card. Please try again.");
    } finally {
      setIsDownloading(false);
      if (wasFlipped) setIsFlipped(true);
    }
  };

  const verifyUrl = `https://ambassador.bsprep.in/verify/${referralCode || "demo"}`;

  return (
    <div className="flex flex-col items-center">
      {/* Controls */}
      <div className="flex items-center gap-3 mb-8">
        <button 
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-2 bg-slate-200 dark:bg-white/10 text-black dark:text-white px-4 py-3 rounded-full text-xs tracking-widest font-bold uppercase hover:bg-slate-300 dark:hover:bg-white/20 transition-all shadow-sm"
        >
          <RefreshCcw size={16} className={isFlipped ? "rotate-180 transition-transform" : "transition-transform"} />
          Flip
        </button>
        <button 
          onClick={downloadCard}
          disabled={isDownloading}
          className="flex items-center gap-2 bg-[#1C364A] text-white px-6 py-3 rounded-full text-xs tracking-widest font-bold uppercase hover:bg-black transition-all disabled:opacity-50 hover:-translate-y-1 shadow-md"
        >
          <Download size={16} />
          {isDownloading ? "Generating..." : "Download"}
        </button>
      </div>

      {/* The ID Card Container with Perspective */}
      <div style={{ perspective: '1000px' }} className="w-full max-w-[300px]">
        
        {/* The Flipping Element */}
        <div 
          ref={cardRef} 
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full h-[450px] transition-transform duration-700 cursor-pointer"
          style={{ 
            transformStyle: 'preserve-3d', 
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
          }}
        >
          
          {/* FRONT FACE */}
          <div 
            className="absolute inset-0 rounded-[16px] overflow-hidden shadow-2xl flex flex-col p-2 pb-6"
            style={{ 
              backgroundColor: "#F2F0E9", 
              color: "#1C364A",
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Lanyard Clip Front */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#1C364A] rounded-b-xl shadow-inner z-20 flex items-center justify-center">
              <div className="w-10 h-1.5 bg-white/50 rounded-full shadow-inner" />
            </div>

            <div className="relative z-10 bg-white border border-[#1C364A]/10 rounded-xl h-full pt-12 pb-6 px-5 flex flex-col items-center text-center mt-3 shadow-sm">
              <div className="flex flex-col items-center mb-8 w-full justify-center">
                <div className="relative w-20 h-20 mb-4">
                  <Image src="/bsprep.png" alt="BSPrep Logo" fill className="object-contain" unoptimized />
                </div>
                <h2 className="font-black text-2xl leading-none tracking-tighter uppercase text-[#1C364A]">BS PREP</h2>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#1C364A]/60 uppercase mt-2">Ambassador</span>
              </div>

              <div className="w-full flex flex-col items-center flex-1 justify-center">
                <div className="relative w-28 h-28 rounded-full border-4 border-[#1C364A] overflow-hidden bg-gray-100 mb-5 shadow-md">
                  {photoUrl ? (
                    <Image src={photoUrl} alt={name} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#1C364A]/30">No Photo</div>
                  )}
                </div>
                <h3 className="text-xl font-black uppercase tracking-widest truncate w-full mb-2 text-[#1C364A]">{name}</h3>
                <div className="bg-[#1C364A] px-4 py-1.5 rounded-full text-center inline-block">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white">{role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* BACK FACE */}
          <div 
            className="absolute inset-0 rounded-[16px] overflow-hidden shadow-2xl flex flex-col p-2 pb-6"
            style={{ 
              backgroundColor: "#1C364A", // Back is dark navy
              color: "white",
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {/* Lanyard Clip Back */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#0f1f2b] rounded-b-xl shadow-inner z-20 flex items-center justify-center border border-white/10 border-t-0">
              <div className="w-10 h-1.5 bg-white/20 rounded-full shadow-inner" />
            </div>

            <div className="relative z-10 border border-white/10 rounded-xl h-full pt-12 pb-6 px-5 flex flex-col items-center justify-between text-center mt-3">
              
              <div className="w-full">
                <h2 className="font-black text-xl tracking-widest uppercase mb-1">Official ID</h2>
                <p className="text-[9px] uppercase tracking-widest opacity-60">Property of BSPrep</p>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center w-full">
                <div className="p-3 bg-white rounded-2xl shadow-lg mb-4">
                  <QRCodeSVG 
                    value={verifyUrl} 
                    size={140} 
                    level="H" 
                    fgColor="#1C364A" 
                    bgColor="#ffffff"
                  />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-80 mb-1">Scan to Verify</span>
                <span className="font-mono text-sm tracking-widest text-[#F2F0E9] font-bold">ID: {referralCode || "----"}</span>
              </div>

              <div className="text-[8px] uppercase tracking-widest opacity-40 leading-relaxed px-4">
                If found, please return to ambassador.bsprep.in<br/>
                Valid Worldwide
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
