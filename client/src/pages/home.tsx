import { useQuery } from "@tanstack/react-query";
import { Music, Clock, Guitar, Mic } from "lucide-react";
import AudioPlayer from "../components/audio-player";
import LyricsDisplay from "../components/lyrics-display";
import type { Song } from "@shared/schema";

export default function Home() {
  const { data: songs, isLoading } = useQuery<Song[]>({
    queryKey: ["/api/songs"],
  });

  const song = songs?.[0]; // Get the first (and only) song

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-warm-brown rounded-full flex items-center justify-center mx-auto mb-4">
            <Music className="h-6 w-6 text-white animate-pulse" />
          </div>
          <p className="text-gray-600">Loading song...</p>
        </div>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Music className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-600">No song available</p>
        </div>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-gray-50 font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warm-brown rounded-full flex items-center justify-center">
                <Music className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-semibold text-dark-gray">Kevin's Flight</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => scrollToSection('song')}
                className="text-gray-600 hover:text-warm-brown transition-colors"
              >
                Song
              </button>
              <button 
                onClick={() => scrollToSection('lyrics')}
                className="text-gray-600 hover:text-warm-brown transition-colors"
              >
                Lyrics
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-warm-brown transition-colors"
              >
                About
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section id="song" className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          {/* Hero Image */}
          <div 
            className="h-80 bg-cover bg-center relative"
            style={{
              backgroundImage: `linear-gradient(rgba(139, 90, 60, 0.3), rgba(139, 90, 60, 0.3)), url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800')`
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 font-crimson">{song.title}</h2>
                <p className="text-lg md:text-xl opacity-90 font-light">An indie folk tale of coding, vertigo, and dreams</p>
              </div>
            </div>
          </div>

          {/* Song Info and Controls */}
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-dark-gray mb-2">{song.title}</h3>
              <p className="text-gray-600 mb-4">{song.style}</p>
              
              {/* Song Stats */}
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatDuration(song.duration)}
                </span>
                <span className="flex items-center">
                  <Guitar className="h-4 w-4 mr-1" />
                  Indie Folk-Pop
                </span>
                <span className="flex items-center">
                  <Mic className="h-4 w-4 mr-1" />
                  Original
                </span>
              </div>
            </div>

            <AudioPlayer song={song} />
          </div>
        </section>

        <LyricsDisplay song={song} />

        {/* About Section */}
        <section id="about" className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-3xl font-bold text-dark-gray mb-6 text-center font-crimson">About the Song</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-warm-brown mb-4">Story Behind the Song</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                {song.description}
              </p>
              <p className="text-gray-700 leading-relaxed">
                Set in Laredo and featuring Kevin's work at Avero, this indie folk narrative celebrates the unexpected dreams that drive us forward, even when they seem to contradict our current reality.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-warm-brown mb-4">Musical Style</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-warm-brown rounded-full"></div>
                  <span className="text-gray-700">Upbeat indie folk-pop with acoustic guitar foundation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-warm-brown rounded-full"></div>
                  <span className="text-gray-700">Light percussion and conversational vocals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-warm-brown rounded-full"></div>
                  <span className="text-gray-700">Witty storytelling with tech industry themes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-warm-brown rounded-full"></div>
                  <span className="text-gray-700">Clever commercial jingle-inspired melody</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-warm-brown rounded-full flex items-center justify-center">
                <Music className="h-4 w-4 text-white" />
              </div>
              <span className="text-gray-600">&copy; 2024 Kevin's Flight. All rights reserved.</span>
            </div>
            <div className="flex space-x-6">
              <button className="text-gray-500 hover:text-warm-brown transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="text-gray-500 hover:text-warm-brown transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="text-gray-500 hover:text-warm-brown transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
