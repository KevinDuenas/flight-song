import type { Song } from "@shared/schema";

interface LyricsDisplayProps {
  song: Song;
}

interface LyricsData {
  verse1: string[];
  chorus: string[];
  verse2: string[];
  bridge: string[];
  outro: string[];
}

export default function LyricsDisplay({ song }: LyricsDisplayProps) {
  let lyricsData: LyricsData;
  
  try {
    lyricsData = JSON.parse(song.lyrics);
  } catch (error) {
    console.error("Failed to parse lyrics:", error);
    return (
      <section id="lyrics" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h3 className="text-3xl font-bold text-dark-gray mb-8 text-center font-crimson">Lyrics</h3>
        <p className="text-center text-gray-600">Lyrics not available</p>
      </section>
    );
  }

  const renderSection = (title: string, lines: string[], isChorus = false, isItalic = false) => (
    <div className={`lyrics-section ${isChorus ? 'bg-cream rounded-lg p-6' : ''}`}>
      <h4 className="text-sm font-inter font-semibold text-warm-brown uppercase tracking-wide mb-3">
        {title}
      </h4>
      <div className={`text-dark-gray space-y-2 ${isChorus ? 'font-semibold' : ''} ${isItalic ? 'italic' : ''}`}>
        {lines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );

  return (
    <section id="lyrics" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <h3 className="text-3xl font-bold text-dark-gray mb-8 text-center font-crimson">Lyrics</h3>
      
      <div className="max-w-2xl mx-auto space-y-8 font-crimson text-lg leading-relaxed">
        {renderSection("Verse 1", lyricsData.verse1)}
        {renderSection("Chorus", lyricsData.chorus, true)}
        {renderSection("Verse 2", lyricsData.verse2)}
        {renderSection("Chorus", lyricsData.chorus, true)}
        {renderSection("Bridge", lyricsData.bridge, false, true)}
        {renderSection("Outro", lyricsData.outro)}
      </div>
    </section>
  );
}
