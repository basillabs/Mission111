import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

const tracker = new GoogleAnalyticsTracker('UA-96307080-1');

const wrapper = {
  trackScreenView(name) {
    console.log("TRACKING SCREEN: ", name);

    return tracker.trackScreenView(name);
  },

  trackEvent(category, name, details) {
    console.log("TRACKING EVENT: ", category, name, details);

    return tracker.trackEvent(category, name, details);
  }
}


export default wrapper;
