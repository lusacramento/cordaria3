import { useToast } from "vue-toastification";
import { POSITION } from "vue-toastification";
const toast = useToast();

/**
 * Displays a toast notification with the specified message, type, and options.
 *
 * @param id - The unique identifier for the toast notification.
 * @param message - The message to be displayed in the toast notification.
 * @param type - The type of the toast notification. Can be 'success', 'info', 'error', 'warning', or 'update'.
 * @param timeout - The duration (in milliseconds) for which the toast notification will be displayed.
 *
 * @remarks
 * The `type` parameter determines the style and behavior of the toast notification.
 * - 'success': Displays a success toast.
 * - 'info': Displays an informational toast.
 * - 'error': Displays an error toast.
 * - 'warning': Displays a warning toast.
 * - 'update': Updates an existing toast with the given `id`.
 *
 * If the `type` is not one of the specified values, a default toast will be displayed.
 */
export const useTt = (
  id: string,
  message: string,
  type: string,
  timeout: number
) => {
  const options = {
    id: id,
    position: POSITION.TOP_RIGHT,
    timeout: timeout,
    closeOnClick: false,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    case "update":
      toast.update(options.id, { options });

    default:
      toast(message, options);
      break;
  }
};
