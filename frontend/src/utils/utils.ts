import format from 'date-fns/format';

export function formatDate(dateString: string) {
  return format(new Date(dateString), 'yyyy-MM-dd');
}
