import chai from'chai';
import chaiHttp from'chai-http';
import app from'../app';
import Reservation from'../models/Reservation';

chai.should();
chai.use(chaiHttp);

describe('Reservations', () => {
    // 6. Prendre la réservation d’un catway
    it('should create a new reservation', (done) => {
        const newReservation = {
            catwayNumber: 123,
            clientName: 'John Doe',
            boatName: 'Sea Breeze',
            checkIn: '2024-09-10',
            checkOut: '2024-09-15'
        };
        
        chai.request(app)
            .post('/reservations/create')
            .send(newReservation)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('catwayNumber').eql(123);
                done();
            });
    });

    // 7. Supprimer une réservation
    it('should delete a reservation', (done) => {
        const reservation = new Reservation({
            catwayNumber: 123,
            clientName: 'John Doe',
            boatName: 'Sea Breeze',
            checkIn: '2024-09-10',
            checkOut: '2024-09-15'
        });
        reservation.save((err, reservation) => {
            chai.request(app)
                .post(`/reservations/delete/${reservation._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    // 8. Lister l’ensemble des réservations
    it('should list all reservations', (done) => {
        chai.request(app)
            .get('/reservations/list')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    // 9. Afficher les détails d’une réservation en particulier
    it('should get details of a specific reservation', (done) => {
        const reservation = new Reservation({
            catwayNumber: 123,
            clientName: 'John Doe',
            boatName: 'Sea Breeze',
            checkIn: '2024-09-10',
            checkOut: '2024-09-15'
        });
        reservation.save((err, reservation) => {
            chai.request(app)
                .get(`/reservations/details/${reservation._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('catwayNumber').eql(123);
                    done();
                });
        });
    });
});
