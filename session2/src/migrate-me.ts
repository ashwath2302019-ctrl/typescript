interface User {
  id: number;
}

let cache: Record<number, User> = {};

function fetchUserFromCache(id: number): User | undefined {
  return cache[id];
}

function saveUserToCache(user: User): string {
  cache[user.id] = user;
  return `${user.id} = ${JSON.stringify(user)}`;
}

type FilterFn = (user: User) => boolean;
type TransformFn = (user: User) => User;

function processUsers(
  users: User[],
  filterFn: FilterFn,
  transformFn: TransformFn
): User[] {
  return users.filter(filterFn).map(transformFn);
}

function buildQueryString(
  params: Record<string, string | number>
): string {
  return Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(String(params[key]))}`)
    .join("&");
}

function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number,
  delay: number
): Promise<T> {
  return new Promise((resolve, reject) => {
    let attempt = 0;

    function run() {
      attempt++;

      fn()
        .then(resolve)
        .catch(err => {
          if (attempt >= maxAttempts) {
            reject(err);
          } else {
            setTimeout(run, delay);
          }
        });
    }

    run();
  });
}

export {
  fetchUserFromCache,
  saveUserToCache,
  processUsers,
  buildQueryString,
  retry
};