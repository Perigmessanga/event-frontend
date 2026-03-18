// src/data/api/events.ts
import axios from "axios";
import type { Event } from '@/types';
import { API_CONFIG } from "@/config/api";

/**
 * Récupère les détails publics d'un événement depuis le backend
 * @param eventId L'ID de l'événement
 * @returns Promise<Event>
 */
export const getEventPublicDetail = async (eventId: string | number): Promise<Event> => {
  try {
    const response = await axios.get(
      `${API_CONFIG.baseUrl}/events/${eventId}/public_detail/`
    );

    const data = response.data.event;

    if (!data) {
      throw new Error("Événement introuvable");
    }

    // Transformation pour correspondre au type Event côté frontend
    return {
      ...data,
      ticketTypes: data.ticket_types || [],   // Toujours un tableau
      date: data.start_date,                  // Renommage start_date → date
      endDate: data.end_date,                 // Renommage end_date → endDate
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de l'événement :", error);
    throw error;
  }
};