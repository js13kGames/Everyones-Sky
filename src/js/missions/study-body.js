class StudyBody extends TimedMissionStep {

    constructor(body) {
        super();
        this.body = body;
        this.prompt = nomangle('We need to study ') + body.name.toUpperCase() + nomangle(', collect some data for us');
        this.maxTime = 120;
        this.targets = [body];

        this.studied = 0;
    }

    instructions() {
        if (this.isClose()) {
            return nomangle('Collecting data... - ') + ~~(this.studied * 100) + '%';
        }
        return nomangle('Get close to ') + this.body.name.toUpperCase();
    }

    attach() {
        super.attach();

        this.listen(EVENT_CYCLE, e => {
            if (this.isClose()) {
                this.studied += e * (1 / 40);

                if (this.studied >= 1) {
                    G.missionDone(true);
                }
            }
        });
    }

    isClose() {
        return dist(U.playerShip, this.body) < this.body.radius * 3;
    }

}