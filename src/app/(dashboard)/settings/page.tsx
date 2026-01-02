import { redirect } from "next/navigation";

import { SettingsView } from "@/components/settings-view/settings-view";
import { ROUTES } from "@/lib/consts";
import { getUser } from "@/lib/user/actions";

/**
 * Render the settings page for the current authenticated user.
 *
 * If no user is authenticated, redirects to the login route.
 *
 * @returns The React element for the settings view populated with the current user.
 */
export default async function SettingsPage() {
	const user = await getUser();

	if (!user) redirect(ROUTES.LOGIN);

	return <SettingsView user={user} />;
}