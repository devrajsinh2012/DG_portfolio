/**
 * A utility that helps manage the real-time updates between admin changes and the frontend
 * by handling synchronization between local state and persistence layer
 */

type UpdateCallback<T> = (newValue: T) => void;

interface StateUpdateManager<T> {
  register: (path: string, callback: UpdateCallback<T>) => void;
  unregister: (path: string) => void;
  notify: (path: string, value: T) => void;
}

export function createStateUpdater<T>(): StateUpdateManager<T> {
  // Store callbacks by path
  const callbacks: Record<string, UpdateCallback<T>[]> = {};

  // Register a callback for a specific path
  const register = (path: string, callback: UpdateCallback<T>) => {
    if (!callbacks[path]) {
      callbacks[path] = [];
    }
    callbacks[path].push(callback);
  };

  // Unregister a callback
  const unregister = (path: string) => {
    delete callbacks[path];
  };

  // Notify all callbacks for a path
  const notify = (path: string, value: T) => {
    if (callbacks[path]) {
      callbacks[path].forEach(callback => callback(value));
    }
  };

  return {
    register,
    unregister,
    notify
  };
}

// Create a singleton instance for the entire app
export const stateUpdater = createStateUpdater();

// Helper hook for components to use
export function useStateUpdate<T>(path: string, initialValue: T): [T, (newValue: T) => void] {
  let currentValue = initialValue;
  
  // Register callback
  stateUpdater.register(path, (newValue: any) => {
    currentValue = newValue;
  });
  
  // Update function
  const update = (newValue: T) => {
    currentValue = newValue;
    stateUpdater.notify(path, newValue);
  };
  
  return [currentValue, update];
}