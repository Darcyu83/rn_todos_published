# rn_todos_published

# 할일 기간 선택(달력)

# 타이틀 + 할일 내용
# 카테고리(Vacation, Meeting, Message, Etc)별 색상 분류

# Firestore data structure 


─ project name : rnTodosPublished

└ todosList(collection) 

    └ userEmail as ID(Document)

        └ taskId(Collection)

            └ info(document) 

                └ {
                        category: TTodoCate;
                        isInSingleDay: boolean;
                        id: number;
                        title: string;
                        todo: string;
                        startDtData: DateData
                        
                            └  {
                                year: number;
                                month: number;
                                day: number;
                                timestamp: number;
                                dateString: string;
                            };
                        endDtData: DateData

                            └  {
                                year: number;
                                month: number;
                                day: number;
                                timestamp: number;
                                dateString: string;
                            };
                   }
