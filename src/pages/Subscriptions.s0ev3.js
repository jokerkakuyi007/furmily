// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

$w.onReady(function () {
    // Write your JavaScript here

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
});
import wixData from 'wix-data';
import wixUsers from 'wix-users';

$w.onReady(function () {
    // Event handler for the "Subscribe" button
    $w("#subscribeButton").onClick(async () => {
        const userId = wixUsers.currentUser.id; // Get the current user's unique ID
        const serviceType = $w("#serviceDropdown").value; // Get the selected service type (e.g., Small, Medium, Large, Extra Large)

        // Check if the user already has an active subscription for the selected service type
        const result = await wixData.query("Subscriptions")
            .eq("userId", userId)
            .eq("serviceType", serviceType)
            .eq("status", "Active") // Only check active subscriptions
            .find();

        if (result.items.length > 0) {
            // If an active subscription exists, show an error message
            $w("#errorMessage").text = `You already have an active subscription for ${serviceType}.`;
            $w("#errorMessage").show();
        } else {
            // If no active subscription exists, create a new subscription
            wixData.insert("Subscriptions", {
                userId: userId, // User ID
                serviceType: serviceType, // Selected service type
                status: "Active", // Set subscription status to Active
                startDate: new Date() // Record the subscription start date
            }).then(() => {
                $w("#successMessage").text = `Successfully subscribed to ${serviceType}!`;
                $w("#successMessage").show();
                $w("#errorMessage").hide(); // Hide error messages
            }).catch((err) => {
                // Show an error message if the subscription fails
                $w("#errorMessage").text = "Subscription failed. Please try again.";
                $w("#errorMessage").show();
            });
        }
    });
