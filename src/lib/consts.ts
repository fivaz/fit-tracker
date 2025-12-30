export const ROUTES = {
	HOME: "/",
	PROGRAMS: "/programs",
	EXERCISES: "/exercises",
	PROGRESS: "/PROGRESS",
	LOGIN: "/login",
	REGISTER: "/register",
};

export const MAJOR_MUSCLE_GROUPS = [
	"Chest",
	"Back",
	"Shoulders",
	"Biceps",
	"Triceps",
	"Quads",
	"Hamstrings",
	"Glutes",
	"Calves",
	"Abs",
	"Forearms",
	"Traps",
] as const;

// This creates a TypeScript type: "Chest" | "Back" | "Shoulders" ...
export type MuscleGroup = (typeof MAJOR_MUSCLE_GROUPS)[number];
