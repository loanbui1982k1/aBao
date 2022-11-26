export function convertApiDate(api_date) {
  const date = new Date(api_date);
  var day = date.getDay();
  return (
    (day === 0 ? 'Chủ nhật' : `Thứ ${day}`) +
    ', ' +
    date.getDate() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear()
  );
}

export function trimString(str = '', length = 50) {
  if (!str) return 'Ẩn danh';
  return str.length > length - 3 ? str.substring(0, length - 3) + '...' : str;
}
