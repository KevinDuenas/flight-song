import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSongSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all songs
  app.get("/api/songs", async (req, res) => {
    try {
      const songs = await storage.getAllSongs();
      res.json(songs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch songs" });
    }
  });

  // Get specific song
  app.get("/api/songs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid song ID" });
      }
      
      const song = await storage.getSong(id);
      if (!song) {
        return res.status(404).json({ message: "Song not found" });
      }
      
      res.json(song);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch song" });
    }
  });

  // Create new song
  app.post("/api/songs", async (req, res) => {
    try {
      const validatedData = insertSongSchema.parse(req.body);
      const song = await storage.createSong(validatedData);
      res.status(201).json(song);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid song data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create song" });
    }
  });

  // Proxy audio files from Google Drive
  app.get("/audio/kevins-flight.mp3", async (req, res) => {
    try {
      const googleDriveUrl = "https://drive.usercontent.google.com/download?id=1KkvWvpYVpwd8zuOVJ9csUnds8kTehLpn&export=download";
      
      const response = await fetch(googleDriveUrl);
      
      if (!response.ok) {
        return res.status(404).json({ message: "Audio file not found" });
      }
      
      // Set appropriate headers for audio streaming
      res.set({
        'Content-Type': 'audio/mpeg',
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=3600'
      });
      
      // Stream the audio file
      const audioBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(audioBuffer);
      res.send(buffer);
      
    } catch (error) {
      console.error("Error proxying audio file:", error);
      res.status(500).json({ message: "Failed to load audio file" });
    }
  });

  // Serve other audio files (fallback)
  app.get("/audio/*", (req, res) => {
    res.status(404).json({ message: "Audio file not found." });
  });

  const httpServer = createServer(app);
  return httpServer;
}
