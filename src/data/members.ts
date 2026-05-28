import type { Member } from '../types';
import { membersAuto } from './members-auto';

/**
 * Ręczne korekty kadrowania zdjęcia per osoba.
 * Klucz = imię i nazwisko dokładnie jak na stronie PWr.
 * Wartość = CSS object-position, np. 'center top', '50% 20%'.
 */
const photoPosition: Record<string, string> = {
  // 'Piotr Dębicki': 'center top',
};

function deriveSection(role: string): string {
  if (/Przewodnicząca?|Wiceprzewodnicząca?/.test(role)) return 'Zarząd';
  if (/Koordynator/.test(role)) return 'Koordynatorzy';
  return 'Członkowie';
}

export const members: Member[] = membersAuto
  .filter((m) => m.role !== 'Członek WRSS')
  .map((m, i) => ({
    id: i + 1,
    name: m.name,
    role: m.role,
    imageUrl: m.imageUrl ?? '',
    section: deriveSection(m.role),
    quote: '',
    phase: 1 as const,
    photoObjectPosition: photoPosition[m.name],
  }));
