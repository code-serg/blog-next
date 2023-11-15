import format from 'date-fns/format';

export function formatDate(dateString: string) {
  return format(new Date(dateString), 'yyyy-MM-dd');
}

export function generateSlug(input: string) {
  return input
    .replace(/[^a-zA-Z0-9 ]/g, '') // Remove all special characters except spaces
    .trim() // Remove leading and trailing spaces
    .replace(/ +/g, ' ') // Remove extra spaces between words
    .replace(/\s/g, '-') // Replace spaces with hyphens
    .toLowerCase();
}
