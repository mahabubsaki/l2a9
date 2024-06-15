import moment from "moment";
function timeGreetings() {
    // Get the current hour
    var currentHour = moment().hour();

    // Determine the greeting based on the current hour
    if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
        return "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
        return "Good Evening";
    } else {
        return "Good Night";
    }
}
export default timeGreetings;