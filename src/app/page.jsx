import { auth0 } from "@/lib/auth0";

import LandingBefore from "@/components/BeforeLogin/LandingBefore";
import DashboardClient from "@/components/Dashboard/DashboardClient";

export default async function Home() {
    const session = await auth0.getSession();
    const user = session?.user;

    return (<>
        {!user && <LandingBefore />}
        {user && <DashboardClient user={user} />}

    </>
    );
}
