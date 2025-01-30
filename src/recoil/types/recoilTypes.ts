// 게시물 타입 정의
export interface CommunityPost {
    communityId: number; // 게시물 ID
    tag: "recruitment" | "homie" | "question"; // 태그 값 (고정된 값)
    title: string; // 제목
    contents: string; // 본문 내용
    headCount?: number; // 모집 인원
    attendanceCount?: number; // 참석 인원
}

// 태그 맵 정의 (태그 값과 표시 이름 매핑)
export const tagMap: Record<CommunityPost["tag"], string> = {
    recruitment: "모집",
    homie: "동네친구",
    question: "질문",
};