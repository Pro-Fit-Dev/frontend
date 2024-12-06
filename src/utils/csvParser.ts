import Papa from 'papaparse';

interface ExerciseData {
    AGRDE_FLAG_NM: string;
    MBER_SEXDSTN_FLAG_CD: string;
    SPORTS_STEP_NM: string;
    SPORTS_NM: string;
}

export const parseCSV = async (filePath: string): Promise<ExerciseData[]> => {
    const response = await fetch(filePath);
    const text = await response.text();

    const { data } = Papa.parse<ExerciseData>(text, {
        header: true,
        skipEmptyLines: true,
    });

    return data.filter(
        (item): item is ExerciseData =>
            !!item.AGRDE_FLAG_NM && !!item.MBER_SEXDSTN_FLAG_CD && !!item.SPORTS_STEP_NM
    );
};
