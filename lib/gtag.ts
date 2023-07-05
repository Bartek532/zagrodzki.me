// export const reportPageView = (url: string) => {
//   if (typeof window !== "undefined") {
//     //@ts-expect-error
//     window.gtag("config", process.env.GA_TRACKING_ID, {
//       page_path: url,
//     });
//   }
// };

// //@ts-expect-error
// export const event = ({ action, category, label, value }) => {
//   if (typeof window !== "undefined") {
//     //@ts-expect-error
//     window.gtag("event", action, {
//       event_category: category,
//       event_label: label,
//       value: value,
//     });
//   }
// };
