import { users, songs, type User, type InsertUser, type Song, type InsertSong } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getSong(id: number): Promise<Song | undefined>;
  getAllSongs(): Promise<Song[]>;
  createSong(song: InsertSong): Promise<Song>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private songs: Map<number, Song>;
  private currentUserId: number;
  private currentSongId: number;

  constructor() {
    this.users = new Map();
    this.songs = new Map();
    this.currentUserId = 1;
    this.currentSongId = 1;

    // Initialize with Kevin's Flight song
    this.createSong({
      title: "Kevin's Flight",
      artist: "Original",
      style: "Upbeat indie folk-pop with witty storytelling, acoustic guitar, light percussion, conversational vocals like a clever tech commercial jingle",
      duration: 222, // 3:42
      audioUrl: "/audio/kevins-flight.mp3",
      lyrics: JSON.stringify({
        verse1: [
          "Kevin codes in Laredo, fixing bugs all day",
          "At Avero crunching numbers, restaurant data's his way",
          "Born down in Mexico, sushi's his favorite meal",
          "But here's the plot twist that makes this story real"
        ],
        chorus: [
          "He's got vertigo, the world keeps spinning 'round",
          "But he's learning to fly when his feet leave the ground",
          "Making sense of the sky while the room's doing loops",
          "Kevin's flying high despite his inner whoops"
        ],
        verse2: [
          "JavaScript and databases, that's his daily grind",
          "Helping restaurants profit with his coding mind",
          "The irony's not lost on this software engineer",
          "Dizzy on solid ground but pilot dreams are clear"
        ],
        bridge: [
          "From debugging code to pre-flight inspection",
          "Sometimes life's about embracing contradiction"
        ],
        outro: [
          "Kevin from Laredo, reaching for the sky",
          "Vertigo can't stop this coding guy from learning how to fly"
        ]
      }),
      description: "Kevin's Flight tells the unique story of a software engineer who finds irony in his daily life. Despite struggling with vertigo on solid ground, Kevin dreams of taking to the skies as a pilot. The song captures the beautiful contradiction of someone who can navigate complex code but struggles with his inner equilibrium."
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSong(id: number): Promise<Song | undefined> {
    return this.songs.get(id);
  }

  async getAllSongs(): Promise<Song[]> {
    return Array.from(this.songs.values());
  }

  async createSong(insertSong: InsertSong): Promise<Song> {
    const id = this.currentSongId++;
    const song: Song = { ...insertSong, id };
    this.songs.set(id, song);
    return song;
  }
}

export const storage = new MemStorage();
