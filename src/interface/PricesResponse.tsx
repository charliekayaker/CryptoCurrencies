export interface Price {
    lprice: string;
    lprice0: string;
    lprice1: string; 
    curr0: string;
    curr1: string;
    curr2: string;
}

export interface UserResponse {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    data:        Usuario[];
    support:     Support;
}

export interface Usuario {
    id:         number;
    email:      string;
    first_name: string;
    last_name:  string;
    avatar:     string;
}

export interface Support {
    url:  string;
    text: string;
}
