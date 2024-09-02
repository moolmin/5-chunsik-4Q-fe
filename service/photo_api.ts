const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const generatePhotoImg = async (category: string, tags: string[]) => {
    try {
        const response = await fetch(`${BASE_URL}/image`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ category, tags })
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("이미지 생성에 실패했습니다.");
        }
    } catch(error) {
        throw error;
    }
};

export const generateTicket = async (
    ticketImage: File,
    backgroundImageId: number,
    shortenUrlId: number,
    title: string,
) => {
    try {
        const formData = new FormData();
        formData.append("ticketImage", ticketImage);
        formData.append("backgroundImageId", backgroundImageId.toString());  
        formData.append("shortenUrlId", shortenUrlId.toString());  
        formData.append("title", title);

        const response = await fetch(`${BASE_URL}/ticket`, { 
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            return {
                ticketId: data.id
            };
        } else {
            throw new Error("티켓 생성에 실패했습니다.");
        }
    } catch (error) {
        throw error;
    }
};


export const getTicketInfo = async (ticketId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/ticket/${ticketId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return {
                ticketUrl: data.ticketUrl,
                title: data.title,
                shortenUrl: data.shortenUrl
            };
        } else {
            throw new Error("티켓 정보를 가져오는데 실패했습니다.");
        }
    } catch (error) {
        throw error;
    }
};


export const getMyTicket = async() => {
    const token = localStorage.getItem('AccessToken');
    try {
        const response = await fetch(`${BASE_URL}/myPQ`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("티켓 정보를 가져오는데 실패했습니다.");
        }
    } catch (error) {
        throw error;
    }
};
