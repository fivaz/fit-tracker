import { redirect } from "next/navigation";

import { SettingsView } from "@/components/settings-view/settings-view";
import { ROUTES } from "@/lib/consts";
import { getUser } from "@/lib/user/actions";

export default async function SettingsPage() {
	const user = await getUser();

	if (!user) redirect(ROUTES.LOGIN);

	return <SettingsView user={user} />;
}
